import csv
import json
import requests

def getLatAndLong(address):
	# api-endpoint
	URL = "https://maps.googleapis.com/maps/api/geocode/json"
	API_KEY = "AIzaSyDTwGRSfyvfOUMH84GTW-i0werk9UHSOF0"

	# defining a params dict for the parameters to be sent to the API
	PARAMS = {'address': address, 'key': API_KEY}

	# sending get request and saving the response as response object
	r = requests.get(url = URL, params = PARAMS)

	# extracting data in json format
	data = r.json()
	coordinates = {}

	# extracting latitude, longitude and formatted address 
	# of the first matching location
	coordinates["lat"] = data['results'][0]['geometry']['location']['lat']
	coordinates["lng"] = data['results'][0]['geometry']['location']['lng']
	return coordinates


def seed():
	data = []
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
			print('Done reading', brewery_data['label'], brewery_data['coordinates'])
			data.append(brewery_data)
			index += 1
	
	print('Done creating data')
	with open('breweries.json', mode='w') as jsonfile:
		print('Writing data')
		json.dump(data, jsonfile, ensure_ascii=False)
	
	print('Done')
seed()