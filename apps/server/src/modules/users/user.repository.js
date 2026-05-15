import { User } from "./user.model.js";
export const usersRepository = {
  create(data) {
    return User.create(data);
  },
  findById(id) {
    return User.findById(id);
  },
  findByUsername(username) {
    return User.findOne({ username: username.toLowerCase() });
  },
  findByEmail(email, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    return includePassword ? query.select("+passwordHash") : query;
  },
  findByEmailOrUsername(email, username) {
    return User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });
  },
  updateById(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },
};
