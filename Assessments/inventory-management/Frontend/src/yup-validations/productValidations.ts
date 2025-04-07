import * as Yup from "yup";

export const prouductFromValidations = Yup.object().shape({

    name:Yup.string().required("Product name is required"),
    description:Yup.string().required("Description is required").min(15, 'Must be at least 15 characters')
    .max(800, 'Must be at most 800 characters'),
    quantity:Yup.number().integer('Please enter a valid number.').required("Quantity  is required"),
    price:Yup.number().min(1, `Minimum price is $1`).required("Price is required"),
    categories:Yup.string().required("Category is required")
 
});
