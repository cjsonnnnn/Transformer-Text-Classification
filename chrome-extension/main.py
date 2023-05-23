from transformers import TFDistilBertForSequenceClassification, DistilBertTokenizerFast, AutoTokenizer, TFBertForSequenceClassification
import tensorflow as tf
from flask import Flask, request, jsonify



app = Flask(__name__)



# bert
# model = TFBertForSequenceClassification.from_pretrained("mclass_model_bert")
# tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

# distilbert
model = TFDistilBertForSequenceClassification.from_pretrained("mclass_model_distilbert")
tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')


@app.route('/', methods=['GET'])
def run():
    sentence = request.args.get('selectedText', '')

    # define labels
    emotion_labels = ['anger', 'fear', 'joy', 'love', 'sadness', 'surprise', "neutral"]

    # tokenize the sentence
    sentence_encodings = tokenizer([sentence], truncation=True, padding=True)

    # create a tensor
    sentence_tensor = tf.data.Dataset.from_tensor_slices((
        dict(sentence_encodings),
        [0]
    ))

    # predicting
    predictions = model.predict(sentence_tensor)

    # use softmax to convert prediction into probabilities
    probs = tf.nn.softmax(predictions[0], axis=-1)
    
    # get the most likely emotion
    predicted_emotion = tf.argmax(probs, axis=-1).numpy()[0]

    # wrap as response
    response = {'emotion': emotion_labels[predicted_emotion]}

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)