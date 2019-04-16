// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import main from './main';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    counter: main
  });
}
