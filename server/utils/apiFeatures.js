class apiFeatures{

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
        // console.log('API FEATURES queyr: ',query);
        // console.log('API FEATURES queyrstr: ',queryStr);
    }

    search() {
        const keyword = {};
        if (this.queryStr.startLocation) {
            keyword.startLocation = {
                $regex: this.queryStr.startLocation,
                $options: "i",
            };
        }

        if (this.queryStr.destination) {
            keyword.destination = {
                $regex: this.queryStr.destination,
                $options: "i",
            };
        }
        if (this.queryStr.date) {
            const date = new Date(this.queryStr.date);
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            keyword.date = {
                $gte: date,
                $lt: nextDate,
            };
        }
        // console.log("API FEATURES search keyword:", keyword);
        // console.log("API FEATURES search startLocation:", this.queryStr.startLocation);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr};

        //REMOVE SOME FIELDS FOR CATEGORY
        const removeField=["startLocation","destination","limit"];
        removeField.forEach(key=>delete queryCopy[key]);
        // console.log(queryCopy);{ category: 'soft drinks' }


        //FILTER FOR PRICE
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);


        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=resultPerPage*(currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }

    
};

export default apiFeatures;