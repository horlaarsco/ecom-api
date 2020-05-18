import * as bcrypt from "bcrypt";

export const addModel = async (Model, input) => {
  const model = await Model.create(input);
  return model;
};

export const deleteModel = async (Model, id) => {
  const model = await Model.findByIdAndDelete(id);
  return model;
};

export const readModels = async (Model) => {
  const model = await Model.find();
  return model;
};

export const readModel = async (Model, id) => {
  const model = await Model.findById(id);
  return model;
};

export const editModel = async (Model, id, input) => {
  let Keys = Object.keys(input);
  let model = await Model.findByIdAndUpdate(id);
  Keys.map((key) => {
    if (model[key] != input[key]) {
      return (model[key] = input[key]);
    }
  });
  model.save();
  return model;
};

export const editUser = async (Model, id, input) => {
  let Keys = Object.keys(input);
  let model = await Model.findByIdAndUpdate(id)
    .select({ password: false, username: false, email: false })
    .exec();
  Keys.map((key) => {
    if (model[key] != input[key]) {
      return (model[key] = input[key]);
    }
  });
  model.save();
  return model;
};

export const editPassword = async (Model, id, password) => {
  let model = await Model.findByIdAndUpdate(id);
  model.password = await bcrypt.hash(password, 8);
  model.save();
  return model;
};
