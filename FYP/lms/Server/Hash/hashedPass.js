import bcrypt from "bcrypt";

const hashPassword = async () => {
  const password = "admin123";
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hashedPassword);
};

hashPassword();
