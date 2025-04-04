# Real-Time Filtering of Abusive Language for Social Media Applications

This project addresses the pressing issue of abusive language and harmful comments on social media platforms. It leverages the power of Natural Language Processing (NLP) and Deep Learning to automatically detect and remove abusive words or phrases from user-generated content.

The model is specifically fine-tuned for Hinglish (a combination of Hindi and English) and English, which are widely used languages on platforms like Instagram, Twitter, and Facebook. By filtering harmful content, this project aims to promote respectful communication and a safer online environment.

## Video Demonstration

[![Automated Detection and Removal of Abusive Comments on Social Media](https://img.youtube.com/vi/73Y2mjtr0BM/0.jpg)](https://www.youtube.com/watch?v=73Y2mjtr0BM)


## Features
- Detects abusive words and phrases in comments or posts.
- Supports Hinglish and English text inputs.
- Fine-tuned using BERT (Bidirectional Encoder Representations from Transformers) to enhance accuracy.
- Automatically removes or flags abusive content.
- Scalable for integration with social media moderation systems.

## Prerequisites
- Python 3.8+
- Required libraries: transformers, torch, scikit-learn, pandas, FastAPI, uvicorn, React.js.
  
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-v0.68+-green)
![Pytorch](https://img.shields.io/badge/PyTorch-v1.9+-red)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-blueviolet)


## Results

The fine-tuned BERT model effectively detects abusive content with:
- Accuracy: 95%
  

## Getting Started

### Installation
Clone this repository and install the required libraries:

```bash
git clone https://github.com/KDGehlot2003/commentsheild.ai
cd commentsheild.ai
```
- To Start Instagram
```bash
cd instagram
npm i
npm run dev
```
- To Start the commentsheild.ai in the terminal
```bash
cd dashboard
npm i
npm run dev
```
- To run the backend run all the cell in the file `Models/English_Abusive_Comment_Detection.ipynb`

## Contributing

Feel free to contribute to this project by opening an issue or submitting a pull request (PR).  
We welcome improvements, suggestions, and bug fixes!

### How to Contribute:
1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Submit a pull request (PR) to the `main` branch

We look forward to your contributions!

## License  
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
