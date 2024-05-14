import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { create, getOne } from "../../services";
import "./supplement.css"
import CartContext from "../../context/cartContext";
import QtySelector from "../../components/qtySelector/qtySelector"; 
import Reviews from "../../components/reviews/reviews";
import { Rating } from "react-simple-star-rating";
import { useAuthHeader } from "react-auth-kit";

const Supplement = ()=>{ 
    const[supplement,setSupplement]=useState({}) 
    const params = useParams();
    const navigate = useNavigate()
    const id = params.id; 
    const cart = useContext(CartContext)
    const headers = useAuthHeader();

    const loadSupplement = async()=>{
        try{
            const supplement = await getOne({
                service:"supplements",
                id
            }) 
            setSupplement(supplement.data.doc)
        }catch(error){
            console.log("error",error)
            navigate("/notFound")
        }
    }

    const postReview = async ({rating,review})=>{ 
        try{
            await create({
                service:"reviews",
                data:{review,rate:rating},
                url:"supplements",
                id:id,
                headers:headers()
            })
        }catch(err){
            console.log(err)
        }
    }  

    useEffect(()=>{
        loadSupplement()
    },[]) 

    const weight = `${supplement.weight && supplement.weight.weight || ""}${supplement.weight && supplement.weight.measure || ""}`

 
    return(
        <div className="mainWrapper">
            <section> 
                <div className="supplementHeader">
                    <div className="supplementImage">
                        <div className="supplementTitle"> 
                            <div className="supplementBrand"> {supplement.brand} </div>
                            <div className="supplementName">
                                <h1>{supplement.name} {weight}</h1>
                            </div>
                        </div> 
                        <div className="supplementImageWrapper">
                            <img src={`${process.env.REACT_APP_APIURL}/img/supplements/${id}.jpg`}/>
                        </div>                     
                    </div>
                    <div className="supplementInfo">
                        <div className="supplementTitle">
                            <div className="supplementBrand"> {supplement.brand} </div>
                            <div className="supplementName">
                                <h1>{supplement.name} {weight}</h1>
                            </div>
                        </div> 
                        <div className="ratingStars">
                            <Rating 
                                initialValue={supplement.ratingsAverage}
                                size={20}
                                transition
                                readonly
                            />
                            <div>{supplement.ratingsQuantity || 0} reviews</div>
                        </div> 
                        <div className="supplementPrice"> 
                            €{supplement.price} 
                        </div>
                        <div className="supplementAvailable">
                            <p> { !supplement.quantity ? "Not available" : `In stock (${supplement.quantity})` } </p>
                        </div> 
                        <div className="supplementSelectTools">
                             <QtySelector 
                                id={supplement._id} 
                                item={supplement} 
                                handlerAddToCart={cart.addToCart} 
                                inCart={false}
                            />
                        </div> 
                    </div>
                </div>
            </section>
            <section>
                <div className="supplementDescription">
                    {supplement.longDescription}
                </div>
            </section>
            <section> 
                <div className="supplementNutritionInfo"> 
                    <h2>Nutrition (per serving)</h2>
                    <table>
                        <tbody> 
                        <tr>
                            <td>Callories</td> 
                            <td>{supplement.nutrition && supplement.nutrition.calories}</td>
                        </tr>
                        <tr>
                            <td>Carbohydrate</td> 
                            <td>{supplement.nutrition && supplement.nutrition.carbohydrate}g</td>
                        </tr>
                        <tr>
                            <td>Fat</td> 
                            <td>{supplement.nutrition && supplement.nutrition.fat}g</td>
                        </tr>
                        <tr>
                            <td>Protein</td> 
                            <td>{supplement.nutrition && supplement.nutrition.protein}g</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section> 
            <section>
                <Reviews
                    ratingsAverage={supplement.ratingsAverage || 0}
                    ratingsQuantity={supplement.ratingsQuantity || 0}
                    reviews={supplement.supplementReviews || []}
                    postReview={postReview}
                />
            </section>
        </div>
    )
}

export default Supplement;