import { query, body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateGetTasks = [
  query('completed').optional().isBoolean().withMessage('completed must be boolean').toBoolean(),
  query('search').optional().isString().withMessage('search must be string').trim(),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be positive integer').toInt(),
  query('limit').optional().isInt({ min: 1 }).withMessage('limit must be positive integer').toInt(),
  handleValidationErrors
];

export const validateGetTask = [
  param('id').isUUID().withMessage('id must be a valid UUID'),
  handleValidationErrors
];

export const validateAddTask = [
  body('title').notEmpty().withMessage('Title is required').isString().trim(),
  body('attachmentPath').optional().isString().trim(),
  handleValidationErrors
];

export const validateEditTask = [
  param('id').isUUID().withMessage('id must be a valid UUID'),
  body('title').optional().isString().trim(),
  body('title').custom((value) => {
    if (value === '') throw new Error('Title cannot be empty');
    return true;
  }),
  body('completed').optional().isBoolean().withMessage('completed must be boolean').toBoolean(),
  body('attachmentPath').optional().isString().trim(),
  handleValidationErrors
];

export const validateToggleTask = [
  param('id').isUUID().withMessage('id must be a valid UUID'),
  handleValidationErrors
];

export const validateRemoveTask = [
  param('id').isUUID().withMessage('id must be a valid UUID'),
  handleValidationErrors
];