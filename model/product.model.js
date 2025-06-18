import pool from "../db/dbConfig.js";

class Product{
    constructor(id,title,description,category,price,brand,discountPercentage,rating,stock,warrantyInformation,shippingInformation,availabilityStatus,returnPolicy,thumbnail,isTrending ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.brand = brand;
        this.discountPercentage = discountPercentage;
        this.warrantyInformation = warrantyInformation;
        this.returnPolicy = returnPolicy;
        this.shippingInformation = shippingInformation;
        this.rating = rating;
        this.thumbnail = thumbnail;
        this.stock = stock; 
        this.availabilityStatus = availabilityStatus;
        this.isTrending = isTrending ;
    }
    static create(product){
      return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
            if(!err){
               let sql = "insert into products(id,title,description,category,price,brand,discountPercentage,rating,stock,warrantyInformation,shippingInformation,availabilityStatus,returnPolicy,thumbnail) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
               con.query(sql,[product.id,product.title,product.description,product.category,product.price,product.brand,product.discountPercentage,product.rating,product.stock,product.warrantyInformation,product.shippingInformation,product.availabilityStatus,product.returnPolicy,product.thumbnail],(err,result)=>{
                 con.release();
                 err ? reject(err) : resolve(result);
               });
            }
            else reject(err);
         })
      });       
    }

    static findAll(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
            let sql = "select * from products";
            con.query(sql,(err,result)=>{
                con.release();
                err ? reject(err) : resolve(result);
            })
           });
        });
    }

    static findById(productId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                let sql = "select * from products where id = ?";
                con.query(sql,[productId*1],(err,result)=>{
                    con.release();
                    err ? reject(err) : resolve(result);
                })
            });
        });
    }

    static findingTrending(limit = 8){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                  if (err) return reject(err);
                let sql = "select * from products where isTrending = 1 limit ?";
                con.query(sql,[limit],(err,result)=>{
                    con.release();
                    err ? reject(err) : resolve(result);
                })
            });

        });
    }
}

export default Product;