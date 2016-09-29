(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('testApp', ['module', 'redux', 'redux-observable'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('redux'), require('redux-observable'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.redux, global.reduxObservable);
        global.testApp = mod.exports;
    }
})(this, function (module, redux, reduxObservable) {
    'use strict';

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    var pingEpic = function pingEpic(action$) {
        return action$.filter(function (action) {
            return action.type === 'PING';
        }).delay(1000).mapTo({ type: 'PONG' });
    };

    var ping$1 = ping = function ping() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isPinging: false };
        var action = arguments[1];

        switch (action.type) {
            case 'PING':
                return { isPinging: true };

            case 'PONG':
                return { isPinging: false };

            default:
                return state;
        }
    };

    var FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
    var FETCH_USER = 'FETCH_USER';
    var FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED';
    var fetchUserFulfilled = function fetchUserFulfilled(payload) {
        return { type: FETCH_USER_FULFILLED, payload: payload };
    };

    var fetchUserEpic = function fetchUserEpic(action$) {
        return action$.ofType(FETCH_USER).mergeMap(function (action) {
            return ajax.getJSON('https://api.github.com/users/' + action.payload).map(fetchUserFulfilled).takeUntil(action$.ofType(FETCH_USER_CANCELLED));
        });
    };

    var users$1 = users = function users() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        switch (action.type) {
            case FETCH_USER_FULFILLED:
                return _defineProperty({}, action.payload.login, action.payload);

            default:
                return state;
        }
    };

    var rootEpic = reduxObservable.combineEpics(pingEpic, fetchUserEpic);

    var rootReducer = redux.combineReducers({
        ping: ping$1,
        users: users$1
    });

    var epicMiddleware = reduxObservable.createEpicMiddleware(rootEpic);

    var configureStore$1 = configureStore = function configureStore() {
        var store = redux.createStore(rootReducer, compose(redux.applyMiddleware(epicMiddleware), window.devToolsExtension ? window.devToolsExtension() : function (f) {
            return f;
        }));

        return store;
    };

    var index = function index() {
        _classCallCheck(this, index);

        var dataStore = configureStore$1();
        console.log(dataStore);
    };

    module.exports = index;
});