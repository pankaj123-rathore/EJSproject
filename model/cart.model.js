import pool from "../db/dbConfig.js";

class Cart {
  constructor({ id, user_id, product_id, quantity }) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity || 1;
  }

  
  // static async addToCart(userId, productId, quantity = 1) {
  //   const [result] = await pool.execute(
  //     `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
  //     [userId, productId, quantity]
  //   );
  //   return result;
  // }

static addToCart(userId,productId,quantity = 1){
  return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
           let sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
           con.query(sql, [userId, productId, quantity],(err,result)=>{
            con.release();
           err ? reject(err) : resolve(result);
           });
        }
         else reject(err);
      })
  })
}


static getCartItemsByUser(userId){
  return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
         const sql = "SELECT c.id, c.quantity, p.id AS productId, p.title AS name, p.price, p.thumbnail AS image  FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?";
         con.query(sql, [userId],(err,result)=>{
            con.release();
           err ? reject(err) : resolve(result);
           });
        }
         else reject(err);
      })
  })
}


  // ✅ Update quantity
  static async updateQuantity(cartId, quantity) {
    const [result] = await db.execute(
      `UPDATE cart SET quantity = ? WHERE id = ?`,
      [quantity, cartId]
    );
    return result;
  }

static removeItem(cartId){
  return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
         const sql = "DELETE FROM cart WHERE id = ?";
         con.query(sql, [cartId],(err,result)=>{
            con.release();
           err ? reject(err) : resolve(result);
           });
        }
         else reject(err);
      })
  })
}


static updateQuantity(cartId, quantity) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (!err) {
        const sql = "UPDATE cart SET quantity = ? WHERE id = ?";
        con.query(sql, [quantity, cartId], (err, result) => {
          con.release();
          err ? reject(err) : resolve(result);
        });
      } else reject(err);
    });
  });
}

  // ✅ Clear cart for user
  static async clearCart(userId) {
    const [result] = await db.execute(
      `DELETE FROM cart WHERE user_id = ?`,
      [userId]
    );
    return result;
  }
}

export default Cart;
