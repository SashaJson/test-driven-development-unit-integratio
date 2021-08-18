'use strict';

const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();

let req, res, next;
const HTTP_CODE_201_OF_REQUEST_SUCCEEDED = 201;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('TodoController.createTodo', () => {

    it('should have a createTodo function', () => {

       expect(typeof TodoController.createTodo).toBe('function');

    });

    it('should call TodoModel.create',() => {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);

    });

    it('should return 201 response code',async () => {

        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(HTTP_CODE_201_OF_REQUEST_SUCCEEDED);
        expect(res._isEndCalled()).toBeTruthy();

    });

    it('should return json body in response',async () => {

        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);

    });

}); // describe (TodoController.createTodo)
