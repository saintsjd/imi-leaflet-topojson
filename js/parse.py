import json

mapStates = {}
with open('/home/jon/Dev/imi-leaflet-topojson/js/map.json') as f:
	result = json.loads(f.read())
	for r in result["results"]:
		mapStates[(r[0],r[1])] = r[2]


with open('/home/jon/Dev/imi-leaflet-topojson/js/demand-county-abrasives.json') as f:
	result = json.loads(f.read())
	for r in result["results"]:
		key = "{}.{}.{}".format(r[0],mapStates[(r[0],r[1])], r[3][2:] )
		demand = r[4]
		print '"{}": {},'.format(key,demand)