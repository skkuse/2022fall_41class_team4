import React from "react";
import Td from "./Td";

class Tr extends React.Component {


    render() {
        console.log(this.props.ProblemData);

        return (
            <tbody>
                {
                    this.props.ProblemData.map((elem) => {
                        return (
                            <Td item={elem} />
                        );
                    })
                }
            </tbody>
        );
    };
};

export default Tr;