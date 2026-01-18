import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv); // Required for "email" and "date" formats

const UserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    isActive: { type: "boolean" },
    tags: { type: "array", items: { type: "string" } }
  },
  required: ["id", "username", "email", "isActive"],
  additionalProperties: false // Ensures no extra unexpected fields
};

test('verify user schema with ajv', async ({ request }) => {
  const response = await request.get('/api/users/1');
  const body = await response.json();

  const validate = ajv.compile(UserSchema);
  const valid = validate(body);

  if (!valid) {
    console.error('Schema Errors:', validate.errors);
  }

  expect(valid).toBe(true);
});

const OrderSchema = {
  type: "object",
  properties: {
    orderId: { type: "string", pattern: "^ORD-\\d+$" }, // e.g., ORD-123
    totalPrice: { type: "number", minimum: 0 },
    isPaid: { type: "boolean" },
    customer: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" }
      },
      required: ["email"]
    },
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          productId: { type: "number" },
          name: { type: "string" }
        }
      }
    }
  },
  required: ["orderId", "totalPrice", "customer", "items"]
};

test('verify nested order schema', async ({ request }) => {
  const response = await request.get('/api/orders/99');
  const body = await response.json();

  const validate = ajv.compile(OrderSchema);
  expect(validate(body)).toBe(true);
});