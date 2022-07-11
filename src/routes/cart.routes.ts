import express from "express";
import { uuid } from "uuidv4";
import { carts } from "../data/cart.data";
import { Cart } from "../types/cart.types";

export const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
  if (req.query.maxPrice) {
    const maxPriceCart = carts.filter(
      (cart) => cart.price <= Number(req.query.maxPrice)
    );
    return res.status(200).json(maxPriceCart);
  }
  return res.status(200).json(carts);
});

cartRouter.get("/", (req, res) => {
  if (req.query.prefix) {
    const prefixCart = carts.filter(
      (cart) => cart.product === String(req.query.prefix)
    );
    return res.status(200).json(prefixCart);
  }
  return res.status(200).json(carts);
});

cartRouter.get("/", (req, res) => {
  if (req.query.pageSize) {
    const pageSizeCart = carts.slice(0, 3);
    return res.status(200).json(pageSizeCart);
  }
  return res.status(200).json(carts);
});

cartRouter.get("/:id", (req, res) => {
  const cart = carts.find((cart) => cart.id === Number(req.params.id));
  if (!cart) {
    return res.status(404).json({ error: `ID Not Found: ${req.params.id}` });
  }
  return res.status(200).json(cart);
});

cartRouter.post("/", (req, res) => {
  const newItem: Cart = { id: uuid(), ...req.body };
  carts.push(newItem);
  res.json(newItem);
  return res.status(201).json(newItem);
});

cartRouter.put("/:id", (req, res) => {
  const cart = carts.find(
    (cartItem) => cartItem.id === Number(req.params.id)
  ) as Cart;

  const cartIndex = carts.findIndex(
    (cart) => cart.id === Number(req.params.id)
  );

  const updatedItem = { ...cart, ...req.body };

  carts.splice(cartIndex, 1, updatedItem);

  res.json(updatedItem);
  return res.status(204).json(updatedItem);
});

cartRouter.delete("/:id", (req, res) => {
  const cartIndex = carts.findIndex(
    (cart) => cart.id === Number(req.params.id)
  );
  carts.splice(cartIndex, 1);
  return res.status(204).json(cartIndex);
});
