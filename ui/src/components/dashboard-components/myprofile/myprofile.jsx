import React , { Component ,useState,useEffect  } from "react";
import { Alert,Form,FormGroup,Label,Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import FloatingLabelInput from 'react-floating-label-input';

import axios from "axios";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Loader from "react-loader-spinner";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const  token =localStorage.getItem('token')? localStorage.getItem('token') : '';
const  userid =localStorage.getItem('userid')? localStorage.getItem('userid') : '';



  //class Myprofile extends Component {

const Myprofile = () => {

  
const [userData, setuserData] = useState({});
const [userACData, setuserACData] = useState({});
const [userPrsData, setuserPrsData] = useState([]);

const [titlename,setTitleName] = useState('');
const [acid, setacid] = useState("");
const [accountName, setaccountName] = useState("");
const [panName, setpanName] = useState("");
const [companyName, setcompanyName] = useState("");

const [GST, setGST] = useState("");
const [ACN, setACN] = useState("");
const [bankName, setbnkName] = useState("");

const [IFSC, setIFSC] = useState("");
const [Email, setEmail] = useState("");
const [Phone, setPhone] = useState("");
const [Address, setAddress] = useState("");

const [City, setCity] = useState("");
const [State, setState] = useState("");

const [CPN, setCPN] = useState("");
const [Designation, setDesignation] = useState("");

const [Email2, setEmail2] = useState("");

const [Phone2, setPhone2] = useState("");
const [isloader, setLoader] = useState(false);
useEffect(() => {

  const userid =localStorage.getItem('userid')? localStorage.getItem('userid') : '';

const sendData = {
  key: 'user_pk',
  value: userid,
 
};


    axios.all([
  axios.post('http://127.0.0.1:3001/api/user/getUserDetails',sendData),
  axios.get('http://127.0.0.1:3001/api/user/getUserAccountInfo?key=user_fk&value='+userid)
  
  ])
  .then(axios.spread((data1, data2) => {
    // output of req.
  
    if (data1.status === 200 || data1.status === "ok") {
      if(!data1.data.auth){
          console.log("inside auth")
        } 
        else{
          setTitleName(data1.data.result[0].username)
          // setuserData=data1.data.result[0];
          // setuserData(data1.data.result);
          // console.log(setuserData);
          //setTitleName(data1.result[0].username)
          console.log(data1.data.result[0])
        }
    }
  
  
  
    if (data2.status === 200 || data2.status === "ok") {
      if(!data2.data.auth){
       
        } 
        else{
         
          //  setuserACData=data2.data.result;
          // console.log(setuserACData);

           setacid(data2.data.result[0].account_id);
           
          
           
          setaccountName(data2.data.result[0].account_name);
          setcompanyName(data2.data.result[0].companyname)
          setpanName(data2.data.result[0].pan_number);
          setGST(data2.data.result[0].gst_in);
          setACN(data2.data.result[0].account_number);
          setbnkName(data2.data.result[0].bank_name);
          setIFSC(data2.data.result[0].ifsc_code);
          setEmail(data2.data.result[0].email);
          setPhone(data2.data.result[0].primary_number);
          setAddress(data2.data.result[0].address);
          setCity(data2.data.result[0].city);
          setState(data2.data.result[0].state);
          
//setValue("accountName", data2.data.result[0].account_name);
        
        
          axios.get('http://127.0.0.1:3001/api/user/getUserPersonalInfo?key=account_fk&value='+data2.data.result[0].account_id)
            .then((res) => {
          
            if (res.status === 200 || res.status === "ok") {
              if(!res.data.auth){
               // toast(res.data.message);
                // setColor("danger");
                // setVisible(true);
               
                } 
                else{
                  // setColor("success");toast(res.data.message);
                  // setVisible(true);
                  // setuserPrsData=res.data.result[0];
                if(res.data.result.length>0){
  
                 setCPN(res.data.result[0].name);
                  setDesignation(res.data.result[0].designation);
                  
                  setEmail2(res.data.result[0].email);
                  
                   setPhone2(res.data.result[0].primary_number);
      
                }
                }
            }
          })
         
  
  
  
  
        }
    }
    // console.log('data1', data1, 'data2', data2);
  
    // setuserData.push({"AccountData":res.data.result});
    // source.cancel('Request canceled.');
  
  }));
},[]);
  // console.log(setuserACData);


  const userid =localStorage.getItem('userid')? localStorage.getItem('userid') : '';

   

           
         

        
//   const [acid, setacid] = useState(setuserACData.account_id);
//   const [accountName, setaccountName] = useState(setuserACData.account_name);
// const [panName, setpanName] = useState(setuserACData.pan_number);

// const [GST, setGST] = useState(setuserACData.gst_in);
// const [ACN, setACN] = useState(setuserACData.account_number);
// const [bankName, setbnkName] = useState(setuserACData.bank_name);

// const [IFSC, setIFSC] = useState(setuserACData.ifsc_code);
// const [Email, setEmail] = useState(setuserACData.email);
// const [Phone, setPhone] = useState(setuserACData.primary_number);
// const [Address, setAddress] = useState(setuserACData.address);

// const [City, setCity] = useState(setuserACData.city);
// const [State, setState] = useState(setuserACData.state);

// const [CPN, setCPN] = useState(setuserPrsData.name);
// const [Designation, setDesignation] = useState(setuserPrsData.designation);

// const [Email2, setEmail2] = useState(setuserPrsData.email);

// const [Phone2, setPhone2] = useState(setuserPrsData.primary_number);




  const validationSchema = Yup.object().shape({
        bankname: Yup.string()
        .required('Bank name is required'),
        pan: Yup.string()
        .required('PAN number is required'),
        gst: Yup.string()
        .required('GST IN is required'),
        acno: Yup.string()
        .required(' Account No. is required'),
        accountName: Yup.string()
        .required(' Account Name is required'),
        ifsc: Yup.string()
        .required('IFSC code is required'),
        email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
        phone: Yup.string().required('Primary number is required').max(10,'Primary number must have 10 digit').matches(RegExp('(.*\\d.*)'), 'Invalid primary number'),
        // .integer('Number required'),
        address: Yup.string()
        .required('Address is required'),
        city: Yup.string()
        .required('City is required'),
        state: Yup.string()
        .required('State is required'),
        cpn: Yup.string()
        .required('Contact person name is required'),
        designation: Yup.string()
        .required('Designation is required'),
        email2: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
        phone2: Yup.string().required('Primary number is required').max(10,'Primary number must have 10 digit').matches(RegExp('(.*\\d.*)'), 'Invalid primary number')
        ,
       
      
});
const defaultValues = {
  accountName: accountName,
 
};

// trigger("accountName", { shouldFocus: true }); 

const { register,handleSubmit,watch,setValue,trigger  ,formState:{ errors,touchedFields }  } = useForm({
  resolver: yupResolver(validationSchema)
}
);



const onSubmit = (evt) => {
  setLoader(true);
  const useracnData = {
    accountName: accountName,
    bankName: bankName,
    panNumber: panName,
    gstNumber: GST,
    accountNumber: ACN,
    ifscCode: IFSC,
    email: Email,
    primaryNumber: Phone,
    address: Address,
    city: City,
     state: State,
    userid:userid,
    companyName: companyName,
    
  };

  
  
  const userprsnlData = {
    personName: CPN,
    personDesignation: Designation,
    personEmail: Email2,
    personPrimaryNumber: Phone2,
    insertId: acid,
   
    
  };

  axios
    .post('http://127.0.0.1:3001/api/user/myProfileUpdate',useracnData)
    .then((res) => {
      
     // setLoading(true);
      if (res.status === 200 || res.status === "ok") {
        setLoader(false);
        //localStorage.setItem("token", res.data.token);
      //  setLoading(false);
        if(!res.data.auth){
        toast(res.data.message);
       
         
        } else {
          setLoader(true);
          axios .post('http://127.0.0.1:3001/api/user/personalInfoUpdate',userprsnlData)

          .then((res) => {

            if (res.status === 200 || res.status === "ok") {
              setLoader(false);
              if(!res.data.auth){
                toast(res.data.message);
               

                } 
                else{

                  toast(res.data.message);
                
                }
            }

          })
          .catch((err) => {
            if (err.response) {
              toast(err.response.data.error);
            

              // clearFields();
            }
            return console.log("No Error Found");
          });

         
        }
      }
   
    })
    .catch((err) => {
      if (err.response) {
        toast(err.response.data.error);
        
        // clearFields();
      }
      return console.log("No Error Found");
    });

}
    return (
      <>
      {isloader ? <div className="loaderparent">
        <Loader
        type="BallTriangle"
        color="#00BFFF"
        className="spinloader"
        height={100}
        width={100}
      />
      </div> : ''}

      <div className="innerprofile">
        <Form onSubmit={handleSubmit(onSubmit)}>
        <div className=" with-space">

        <Row>
   
       
<Col sm="12" className="text-left">
    <p className="profilehead">{titlename}</p>
  
  </Col></Row>


  <Row>
   
       
   <Col sm="12" className="text-left">
     <p className="profilehead font-12">Master Details</p>
     
     </Col></Row>

        <Row form>
        <Col md={6}>

    
        <FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      id="cname"
      label="Company Name"
      value={companyName}
      {...register("companyname", { value: companyName })} 
      onChange={(e) => setcompanyName(e.target.value)}     
      // onChange={(e) => setaccountName(e.target.value)} 
     
      
    
    />
              {/* {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' } */}
        {errors.companyname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.companyname.message}</p> : '' }
        </FormGroup></Col>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      
      label="PAN"
      {...register("pan", { value: panName })} 
       onChange={(e) => setpanName(e.target.value)}  
       value={panName}
    />
                  {errors.pan ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.pan.message}</p> : '' }

         
        </FormGroup></Col>
        </Row>
        <Row form>
        <Col md={6}>
        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      
      label="GST IN"
      {...register("gst", { value: GST })}  onChange={(e) => setGST(e.target.value)}  value={GST}
    />
         
         {errors.gst ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.gst.message}</p> : '' }


        </FormGroup>
        </Col>
        <Col md={6}>


        <FormGroup className=" input-spacing inputouter">
        
        <FloatingLabelInput
    
    label="Primary No"
    {...register("phone", { value: Phone })}  onChange={(e) => setPhone(e.target.value)}  value={Phone}

  />

{errors.phone ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.phone.message}</p> : '' }

      </FormGroup>
      
      
        </Col>
        </Row>


        <Row form>

        <Col md={6}>

        <FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      
      label="Email"
      {...register("email", { value: Email })}  onChange={(e) => setEmail(e.target.value)}  value={Email}

    />
    {errors.email ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.email.message}</p> : '' }
          
        
        </FormGroup>
      
        </Col>
        <Col md={6}>

        <FormGroup className=" input-spacing inputouter">

<FloatingLabelInput
      
      label="Address"
      {...register("address", { value: Address })}  onChange={(e) => setAddress(e.target.value)}  value={Address}

    />
{errors.address ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.address.message}</p> : '' }
  
</FormGroup>
     
        </Col>
       
        </Row>

        
        <Row form>

        
        <Col md={6}>
<Row form><Col md={6}>
<FormGroup className=" input-spacing inputouter">

  
<FloatingLabelInput
      
      label="City"
      {...register("city", { value: City })}  onChange={(e) => setCity(e.target.value)}  value={City}

    />
 
 {errors.city ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.city.message}</p> : '' }

</FormGroup></Col>
<Col md={6}>

<FormGroup className=" input-spacing inputouter">

  
<FloatingLabelInput
      
      label="State"
      {...register("state", { value: State })} onChange={(e) => setState(e.target.value)}  value={State}

    />
 {errors.state ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.state.message}</p> : '' }
  
</FormGroup>
</Col>
</Row>
</Col>

       
        </Row>


<Row>
   
       
   <Col sm="12" className="text-left">
     <p className="profilehead font-12">Primary Bank Detail</p>
     
     </Col></Row>


     <Row form>

<Col md={6}>
<FormGroup className=" input-spacing inputouter ">
        <FloatingLabelInput
      
      label="Account Name"
      value={accountName}
      {...register("accountName", { value: accountName })}  onChange={(e) => setaccountName(e.target.value)} 
      onChangeText={(value) => setValue("accountName", value)}
      
    
    />
              {errors.accountName ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.accountName.message}</p> : '' }

         
        </FormGroup>
</Col>
<Col md={6}>
<FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      
      label="Account No"
      {...register("acno", { value: ACN })}   onChange={(e) => setACN(e.target.value)}  value={ACN}
      
    />
    {errors.acno ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.acno.message}</p> : '' }

        </FormGroup>
</Col>

</Row>







<Row form>

<Col md={6}>
<FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      
      label="Bank Name"
      {...register("bankname", { value: bankName })}  
      onChange={(e) => setbnkName(e.target.value)}  
      value={bankName}


    />
    {errors.bankname ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.bankname.message}</p> : '' }

         
        </FormGroup>
</Col>
<Col md={6}>
<FormGroup className=" input-spacing inputouter">
        <FloatingLabelInput
      
      label="IFSC Code"
      {...register("ifsc", { value: IFSC })}  onChange={(e) => setIFSC(e.target.value)}  value={IFSC}

    />
    {errors.ifsc ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.ifsc.message}</p> : '' }
         

        </FormGroup>
</Col>

</Row>






<Row>
   

       
   <Col sm="12" className="text-left">
     <p className="profilehead font-12">Contact Person Details</p>
     
     </Col></Row>


<Row form>

<Col md={6}>
<FormGroup className=" input-spacing inputouter">
  
<FloatingLabelInput
      
      label="Contact Person Name"
      {...register("cpn", { value: CPN })}  onChange={(e) => setCPN(e.target.value)}  value={CPN}

    />
 {errors.cpn ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.cpn.message}</p> : '' }
  
</FormGroup>
</Col>
<Col md={6}>
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
      
      label="Designation"
      {...register("designation", { value: Designation })}  onChange={(e) => setDesignation(e.target.value)}  value={Designation}

    />
 
 {errors.designation ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.designation.message}</p> : '' }

</FormGroup>
</Col>

</Row>



<Row form>

<Col md={6}>
<FormGroup className=" input-spacing inputouter">

<FloatingLabelInput
      
      label="Email"
      {...register("email2", { value: Email2 })}  onChange={(e) => setEmail2(e.target.value)}  value={Email2}

    />
 {errors.email2 ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.email2.message}</p> : '' }
 
</FormGroup>
</Col>
<Col md={6}>
<FormGroup className=" input-spacing inputouter">
<FloatingLabelInput
      
      label="Primary No" 
      {...register("phone2", { value: Phone2, 
        max: 3
      
       })}  
        onChange={(e) => setPhone2(e.target.value)}  value={Phone2}
    />
  
  {errors.phone2 ? <p class="text-danger padd-l-r-10 margin-b-0">{errors.phone2.message}</p> : '' }

</FormGroup>
</Col>

</Row>
      </div>
     
       
        {/* Form End From Here */}

        <Row>
   
       
<Col sm="6" className="text-left">
<Button  type="submit" className="profilebtn">
           Update Detail
          </Button>
        </Col>
</Row>

        </Form>
        <ToastContainer />

        </div>
        </>
        // <Card>
        //     <CardBody>
        //         <CardTitle>Feeds</CardTitle>
        //         <div className="feed-widget">
        //             <ul className="list-style-none feed-body  pb-3">
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-info"><i className="far fa-bell"></i></div> You have 4 pending tasks. <span className="ml-auto font-12 text-muted">Just Now</span>
        //                 </li>
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-success"><i className="ti-server"></i></div> Server #1 overloaded.<span className="ml-auto font-12 text-muted">2 Hours ago</span>
        //                 </li>
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-warning"><i className="ti-shopping-cart"></i></div> New order received.<span className="ml-auto font-12 text-muted">31 May</span>
        //                 </li>
        //                 <li className="feed-item">
        //                     <div className="feed-icon bg-danger"><i className="ti-user"></i></div> New user registered.<span className="ml-auto font-12 text-muted">30 May</span>
        //                 </li>
        //             </ul>
        //         </div>
        //     </CardBody>
        // </Card>
    );
}

export default Myprofile;
