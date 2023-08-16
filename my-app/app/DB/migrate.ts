
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import {migrate} from "drizzle-orm/node-postgres/migrator"
import {db} from './index'
async function main() {

    console.log("Migration Started ......")
    await migrate(db, {migrationsFolder: "drizzle"})
    console.log("Migration Ended.....")
    process.exit(0)
}
main().catch((error) => { console.log(error)

    process.exit(0)

});
