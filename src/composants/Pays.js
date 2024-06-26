import { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Segment , Label, Button} from "semantic-ui-react";

const Pays = () => {
    const navigate = useNavigate();
    const params = useParams()
    console.log(params)
    const alphaCode = params.codePays
    console.log(alphaCode)
    const [pays, setPays] =useState([]);

    useEffect (() => {
        fetch(`https://restcountries.com/v3.1/alpha/${alphaCode}`)
        .then((response) => response.json())
        .then((data) => setPays(data))
        .catch((erreur) => console.log(erreur))
    },[alphaCode])

    console.log(pays)

    return (
        <div>
            <Button onClick={()=> navigate(-1)}> Page précédente</Button> 
            <Button onClick={()=>navigate(1)}> Page suivante</Button> 
            {pays.length > 0 ?
                <Container>
                    <h1>{pays[0].name.common}</h1>
                    <Segment>{pays[0].subregion}</Segment>
                    <img alt="drapeau" src={pays[0].flags.png} style={{width: 130, border:"1px solid grey"}} />
                    <p>Population : {pays[0].population} habitants</p>
                    <p>Latitude : {pays[0].latlng[0]} - Longitude : {pays[0].latlng[1]}</p>
                    <div>
                        {pays[0].borders ?
                            pays[0].borders.map((frontalier) => <Label key={frontalier}>
                                <Link to={`/pays/${frontalier}`}>{frontalier}</Link>
                            </Label>)    
                    :undefined}
                    </div>
                </Container>
                : undefined}
        </div>
    )
};

export default Pays;