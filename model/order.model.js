import pool from "../db/dbConfig.js";

class Order{
    constructor(product_id,customer_name,email,phone,address,payment_method,quantity,total_price,order_date){
        this.product_id = product_id;
        this.customer_name = customer_name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.payment_method = payment_method;
        this.quantity = quantity;
        this.total_price = total_price;;
        this.order_date = order_date;
    }

     create(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
  let sql = "insert into orders (product_id, customer_name, email, phone, address, payment_method, quantity, total_price, order_date)values (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            con.query(sql,[this.product_id,this.customer_name,this.email,this.phone,this.address,this.payment_method,this.quantity,this.total_price,this.order_date],(err,result)=>{
            con.release();
            err ? reject(err) : resolve(result);
            });
            }
            else reject(err);
        })
    });
  }
}
        

export default Order;