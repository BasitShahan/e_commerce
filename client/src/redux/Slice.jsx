import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import data from '../components/data/Data';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const initialState = {
  cart: [],
  loading:false,
  error:null
}
export const createuser=createAsyncThunk('createuser',async (data,{rejectWithValue})=>{
  console.log(data)
try {

  const getuser=await axios.post('/register',data)
console.log(getuser.data)

} catch (error) {
  console.log(error)
return rejectWithValue(error);  
}
})

export const loginUser=createAsyncThunk('loginUser',async (data,{rejectWithValue})=>{
  
                
  console.log(data)

  try {

  const getuser=await axios.post('/login',data)
console.log(getuser.data)

} catch (error) {
  console.log(error)
return rejectWithValue(error);  
}
})

export const cartSlice = createSlice({
  name: 'cart', // Make sure this name matches your reducer name
  initialState,
  reducers: {
    addToCart: (state, action) => {
       
       console.log(action.payload)
       // Modify this according to your cart structure
         const  itemIndex=state.cart.findIndex((item)=>  item.id === action.payload.id)
         console.log(itemIndex)
        if (itemIndex>=0) {
          state.cart[itemIndex].qnty+=1
        }else {
          const temp={...action.payload,qnty:1}
                  state.cart=[...state.cart,temp]

        }

      }
    ,
     remove:(state,action)=>{
    
      const deletedData= state.cart.filter((data)=>{
        return data.id !=action.payload

      })
      state.cart=deletedData;
    
     
    },
    removeAll:(state)=>{
    state.cart=[];
    },
    decrement: (state,action)=>{
    const itemIndex=state.cart.findIndex((data)=> data.id === action.payload.id)
    console.log(itemIndex)
    if (state.cart[itemIndex].qnty >=1) {
      state.cart[itemIndex].qnty-=1
    }

    
    },
    
    extraReducers:{
      [createuser.pending]:(state)=>{
        state.loading=true
       
        },
        [createuser.fulfilled]:(state)=>{
          state.user.push(action.payload)
         
          },
          [createuser.rejected]:(state,action)=>{
            state.error=action.payload
            },

            [loginUser.pending]:(state)=>{
              state.loading=true
             
              },
              [loginUser.fulfilled]:(state)=>{
                
                 console.log(state)
  
                },
                [loginUser.rejected]:(state,action)=>{
                  state.error=action.payload
                  },
                  


          }
    },

});

export const {  addToCart,remove, removeAll,decrement} = cartSlice.actions;

export default cartSlice.reducer;
