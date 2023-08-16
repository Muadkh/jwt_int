import { date, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
export const users= pgTable('users', {
    id: serial('user_id').primaryKey(),
    name:text('user_name'),
    email: text('user_email_address'),
    password: varchar('user_password', { length: 256 }),
  });
  // export const order= pgTable('order_details', {
  //   id: serial('order_id').primaryKey(),
  //   productname: text('product_name'),
  //   producttype: varchar('product_type', { length: 32 }),
  //   productprice:integer('product_price' ),
  //   productquantity: integer('product_quantity'),
  //   orderprice:integer('order_price'),
  //   data:timestamp('order_date',{mode:'date'}).defaultNow()
  // });