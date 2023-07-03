from flask import Flask, request, jsonify
from skimage.metrics import structural_similarity as ssim
import cv2
import numpy as np
import io

app = Flask(__name__)

@app.route('/compare', methods=['POST'])
def compare_images():
    if 'imageA' not in request.files or 'imageB' not in request.files:
        return jsonify({'error': 'Missing file'}), 400
    
    fileA = request.files['imageA'].read()
    npimgA = np.fromstring(fileA, np.uint8)
    imgA = cv2.imdecode(npimgA, cv2.IMREAD_COLOR)
    imgA = cv2.cvtColor(imgA, cv2.COLOR_BGR2GRAY)

    fileB = request.files['imageB'].read()
    npimgB = np.fromstring(fileB, np.uint8)
    imgB = cv2.imdecode(npimgB, cv2.IMREAD_COLOR)
    imgB = cv2.cvtColor(imgB, cv2.COLOR_BGR2GRAY)

    score = ssim(imgA, imgB)
    return jsonify({'similarity': score})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
