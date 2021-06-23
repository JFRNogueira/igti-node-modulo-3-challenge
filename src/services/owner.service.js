import {
  createOwner,
  updateOwner,
  deleteOwner,
  readAllOwners,
  readOneOwner
} from "../repositories/owner.repository.js"

import {
  readAnimalsByOwner
} from "../repositories/animal.repository.js";

async function createOneOwner(req, res) {
  const name = await req.body.name;
  const phone = await req.body.phone;
  const result = await createOwner(name, phone);
  res.status(200).send(result)
}

async function updateOneOwner(req, res) {
  const ownerId = await req.body.ownerId;
  const name = await req.body.name;
  const phone = await req.body.phone;
  const result = await updateOwner(ownerId, name, phone);
  res.status(200).send(result)
}

async function deleteOneOwner(req, res) {
  const ownerId = await req.params.ownerId;
  const ownerAnimals = await readAnimalsByOwner(ownerId);
  const ownerAnimalsCounter = ownerAnimals.rows.length;
  if (ownerAnimalsCounter == 0) {
    res.status(400).send(`Owner DOES HAVE animals and cannot be removed while they exist (#animals: ${ownerAnimalsCounter})`)
    return ;
  }
  const result = await deleteOwner(ownerId);
  res.status(200).send(result)
}

async function getAllOwners(req, res) {
  const result = (await readAllOwners()).rows;
  res.status(200).send(result)
}

async function getOneOwner(req, res) {
  const ownerId = await req.params.ownerId
  const result = (await readOneOwner(ownerId)).rows;
  res.status(200).send(result)
}

export {
  createOneOwner,
  updateOneOwner,
  deleteOneOwner,
  getAllOwners,
  getOneOwner
}