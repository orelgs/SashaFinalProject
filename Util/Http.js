import axios from 'axios';

export function storeAnswers(answersData) {
  axios.post(
    'gs://datarhythm24.appspot.com/answers.json', answersData);
}

