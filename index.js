const { v4: uuidv4 } = require('uuid');
const axios = require('axios'); 
const csvParser = require('csv-parser');

const dataLink = "https://hpy-prd-client-pub-docs.s3.ap-south-1.amazonaws.com/sample_excel_file_integration_csv.csv";
const PostURL = "https://api-v2.happay.in/auth/v1/cards/add_user/";
const token = "iiKZR5dXUwwku5xjUMg0D46zQ";


function sendRequests(userList,PostURL,token){
    userList.forEach(user =>{
        user.requestId = uuidv4();

        user.userId = "user_"+ uuidv4().split("-").toString().replaceAll(",","")
        
        axios.post(PostURL, JSON.stringify(user), {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              console.log('Response:', response.data);
            })
            .catch(error => {
              console.error('Error:', error.response ? error.response.data : error.message);
            });
    })
}

function transformData(data){
    const transformedData = {};
        Object.entries(data).forEach(([key, value]) => {
            let newKey = key.replace(/\s+/g, ''); 
            newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
            transformedData[newKey] = value;
        });
        transformedData.title = transformedData.gender==="Male" ? "Mr." : "Ms."; 
        transformedData.mobileNo = transformedData.mobile;
        transformedData.dob = transformedData.dateofBirth;
        transformedData.emailId = transformedData.email;
        if(transformedData.emailId==="N/A"){
            transformedData.emailId = `${transformedData.firstName}.${transformedData.lastName}@happay.in`;
        }

        const extrafields = {
            "cost_centre" : transformedData.costCentre,
            "cost_category" : transformedData.costCategory,
            "designation" : transformedData.designation,
            "department" : transformedData.department,
        }
        transformedData.extra_fields = extrafields;
        delete transformedData.costCentre;
        delete transformedData.costCategory;
        delete transformedData.mobile;
        delete transformedData.dateofBirth;
        delete transformedData.email;
        return transformedData;        
}

async function fetchAndParseCSV(url) {
    try {
      const response = await axios.get(url, {
        responseType: 'stream',  
      });
  
      return new Promise((resolve, reject) => {
        const results = [];
        response.data.pipe(csvParser())
          .on('data', (row) => {
            results.push(row);
          })
          .on('end', () => {
            resolve(results);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error fetching CSV:', error);
    }
}

async function addAllUsers(dataLink,PostURL,token) {
  try {    
    const usersList = await fetchAndParseCSV(dataLink); // Pass dataLink here
    const transformedUsers = usersList.map(user => transformData(user));
    sendRequests(transformedUsers, PostURL, token);
  } catch (error) {
    console.error('Error fetching CSV:', error);
  }
}

addAllUsers(dataLink,PostURL,token);