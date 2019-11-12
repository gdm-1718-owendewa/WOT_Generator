from sense_hat import SenseHat
import sys
import os
import pyrebase
import time
import random
sense = SenseHat()

config = {
	"apiKey": "AIzaSyBdjYilkD7i3RGgo9WIqMSkmA_FqS-9FOI",
    "authDomain": "wotui-35d67.firebaseapp.com",
    "databaseURL": "https://wotui-35d67.firebaseio.com",
    "projectId": "wotui-35d67", 
    "storageBucket": "wotui-35d67.appspot.com",
    "messagingSenderId": "754339981361"
}
firebase = pyrebase.initialize_app(config)

try:
	while True:
		db = firebase.database()
		ref2 = db.child('pi').get().val()
		
		def fetch():
			ref = db.child('avatars').get();
			r = random.randint(0,255)
			g = random.randint(0,255)
			b = random.randint(0,255)
			rgb = [r,g,b]
			for avatar in ref.each():
				points = avatar.val()
				for point in points:
					print point['x'], point['y']
					sense.set_pixel(int(point['x']),int(point['y']),rgb);
				time.sleep(2)
				sense.clear()
				print ''
		
		if ref2:
			fetch()
		else:
			print'tis false'
	
except (KeyboardInterrupt, SystemExit):
	sense.clear()
	print('\n' + 'Stopped AvatarUI')
	sys.exit(0)
