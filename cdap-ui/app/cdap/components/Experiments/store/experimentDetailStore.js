/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import {createStore, compose} from 'redux';
import {defaultAction} from 'services/helpers';

const ACTIONS = {
  SET_EXPERIMENT_DETAILS: 'SET_EXPERIMENT_DETAILS',
  SET_MODELS: 'SET_MODELS',
  SET_MODEL_DETAILS: 'SET_MODEL_DETAILS',
  SET_ACTIVE_MODEL: 'SET_ACTIVE_MODEL',
  SET_LOADING: 'SET_LOADING',
  SET_SPLITS: 'SET_SPLITS',
  SET_MODEL_STATUS: 'SET_MODEL_STATUS'
};

const DEFAULT_EXPERIMENT_DETAILS = {
  name: '',
  description: '',
  srcpath: '',
  outcome: '',
  outcomeType: '',
  evaluationMetrics: {},
  algorithms: {},
  statuses: {},
  models: [],
  loading: false
};

const experimentDetails = (state = DEFAULT_EXPERIMENT_DETAILS, action = defaultAction) => {
  switch (action.type) {
    case ACTIONS.SET_EXPERIMENT_DETAILS: {
      let {
        name = '',
        description = '',
        srcpath = '',
        outcome = '',
        outcomeType = '',
        evaluationMetrics = {},
        algorithms = {},
        statuses = {}
      } = action.payload.experimentDetails;
      return {
        ...state,
        name,
        description,
        srcpath,
        outcome,
        outcomeType,
        evaluationMetrics,
        algorithms,
        statuses
      };
    }
    case ACTIONS.SET_MODELS:
      return {
        ...state,
        models: action.payload.models,
        loading: false
      };
    case ACTIONS.SET_ACTIVE_MODEL:
      return {
        ...state,
        models: state.models.map(model => ({
          ...model,
          active: !model.active ? model.id === action.payload.activeModelId : !model.active,
          loading: false
        }))
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ACTIONS.SET_SPLITS:
      return {
        ...state,
        models: state.models.map(model => {
          let matchingSplit = action.payload.splits.find(split => split.id === model.split);
          if (matchingSplit) {
            return {
              ...model,
              splitDetails: matchingSplit
            };
          }
          return model;
        })
      };
    case ACTIONS.SET_MODEL_STATUS:
      return {
        ...state,
        models: state.models.map(model => {
          if (model.id === action.payload.modelId) {
            return {
              ...model,
              status: action.payload.modelStatus
            };
          }
          return model;
        })
      };
    default:
      return state;
  }
};
const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'ExperimentDetailStore'
  }) : compose;

const experimentDetailsStore = createStore(
  experimentDetails,
  DEFAULT_EXPERIMENT_DETAILS,
  composeEnhancers()
);

export default experimentDetailsStore;
export {ACTIONS};
