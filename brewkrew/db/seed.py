from __future__ import print_function
from apiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools

import csv
import json
import requests

def read():
	# Setup the Sheets API
	SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
	store = file.Storage('credentials.json')
	creds = store.get()
	if not creds or creds.invalid:
		flow = client.flow_from_clientsecrets('client_secret.json', SCOPES)
		creds = tools.run_flow(flow, store)
	service = build('sheets', 'v4', http=creds.authorize(Http()))

	SPREADSHEET_ID = ''
	# Call the Sheets API
	with open('api-key.json', mode='r') as api:
		keys = json.load(api)
		SPREADSHEET_ID = keys['google']['spreadsheet-id']
	
	RANGE_NAME = 'Data!A1:C152'
	result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID,range=RANGE_NAME).execute()

	print('Getting updates')
	values = result.get('values', [])
	decoded = [[col.encode('utf-8') for col in row] for row in values]
	if not decoded:
		print('No data found.')
	else:
		with open('breweries.csv', 'wb') as breweries:
			print('Saving updates')
			writer = csv.writer(breweries)
			writer.writerows(decoded)
	seed()


def getLatAndLong(address):
	URL = 'https://maps.googleapis.com/maps/api/geocode/json'
	API_KEY = ''
	with open('api-key.json', mode='r') as api:
		keys = json.load(api)
		API_KEY = keys['google']['api-key']

	# defining a params dict for the parameters to be sent to the API
	PARAMS = {'address': address, 'key': API_KEY, }

	# sending get request and saving the response as response object
	print('Getting coordinates')
	try:
		r = requests.get(url = URL, params = PARAMS)
		r.raise_for_status()
	except requests.exceptions.RequestException as e:
		print('Error from google maps')

	# extracting data in json format
	data = r.json()
	coordinates = {}

	# extracting latitude, longitude and formatted address 
	# of the first matching location
	coordinates['lat'] = data['results'][0]['geometry']['location']['lat']
	coordinates['lng'] = data['results'][0]['geometry']['location']['lng']
	return coordinates


def yelp(brewery):
	URL = 'https://api.yelp.com/v3/businesses/search'
	API_KEY = ''
	with open('api-key.json', mode='r') as api:
		keys = json.load(api)
		API_KEY = keys['yelp']['api-key']
	
	PARAMS = {
		'term': brewery['label'],
		'location': brewery['address'],
		'limit': 1
	}

	HEADERS = {
		'Authorization': 'Bearer ' + API_KEY
	}

	print('Getting yelp info')
	try:
		r = requests.get(url = URL, params = PARAMS, headers=HEADERS)
		r.raise_for_status()
	except requests.exceptions.RequestException as e:  # This is the correct syntax
		print('Error from yelp')

	data = r.json()
	return data

def seed():
	data = []
	print('Seeding db')
	with open('breweries.csv', mode='r') as csvfile:
		beerreader = csv.DictReader(csvfile)
		index = 0
		for row in beerreader:
			brewery_data = {}
			brewery_data['label'] = row['Website']
			brewery_data['address'] = row['Address']
			brewery_data['visited'] = row['Done?'] == '1'
			brewery_data['id'] = index
			brewery_data['coordinates'] = getLatAndLong(row['Address'])
			brewery_data['yelp'] = yelp(brewery_data)
			print('Done reading', brewery_data['label'])
			data.append(brewery_data)
			index += 1
	
	print('Done creating data')
	with open('breweries.json', mode='w') as jsonfile:
		print('Writing data')
		try:
			json.dump(data, jsonfile, ensure_ascii=False)
		except UnicodeEncodeError as e:
			print(e)
	
	print('Done')

read()