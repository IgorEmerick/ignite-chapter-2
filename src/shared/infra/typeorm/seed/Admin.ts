import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../";

createConnection();

async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
    values('${id}', 'admin', 'admin@admin.com', '${password}', true, '0')`
  )
}

create().then(() => console.log("User admin created!"));