import requests

url = 'http://192.168.1.77:5000/compare'
files = {
    'imageA': open('Server\\test\\contrast.JPG', 'rb'),
    'imageB': open('Server\\test\\original.JPG', 'rb')
}

response = requests.post(url, files=files)
print(response.json())
