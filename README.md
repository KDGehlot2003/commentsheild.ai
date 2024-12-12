**Abusive Word Detection for Social Media Platforms**

This project addresses the pressing issue of abusive language and harmful comments on social media platforms. It leverages the power of Natural Language Processing (NLP) and Deep Learning to automatically detect and remove abusive words or phrases from user-generated content.

The model is specifically fine-tuned for Hinglish (a combination of Hindi and English) and English, which are widely used languages on platforms like Instagram, Twitter, and Facebook. By filtering harmful content, this project aims to promote respectful communication and a safer online environment.

**Features**
- Detects abusive words and phrases in comments or posts.
- Supports Hinglish and English text inputs.
- Fine-tuned using BERT (Bidirectional Encoder Representations from Transformers) to enhance accuracy.
- Automatically removes or flags abusive content.
- Scalable for integration with social media moderation systems.

**Prerequisites**
- Python 3.8+
- Required libraries: transformers, torch, scikit-learn, pandas, FastAPI, uvicorn, React.js.

**Results**

The fine-tuned BERT model effectively detects abusive content with:
- Accuracy: 95%
- Precision: 92%
- Recall: 94%
- F1-Score: 93%
