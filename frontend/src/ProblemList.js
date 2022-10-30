import React from "react";
import axios, { Axios } from "axios";

class ProblemList extends React.Component {

    state = {

    };

    getProblemData = () => {
        // 임시 데이터
        const url = "https://jsonplaceholder.typicode.com/users";

        Axios.get(url)
            .then(
                (res) => {

                }
            )
            .catch(

        );
    };


}

export default ProblemList;