import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import BanerApp from "../BanerApp/BanerApp";
import ComixList from "../ComixList/ComixList";

import './basec.scss';


const ComixesPage = () => {
    return ( 
        <>
        <main>
            <BanerApp />

            <div className="main__content">
                <ErrorBoundary>
                    <ComixList/>
                </ErrorBoundary>
            </div>
        </main>
        </>
     );
}
 
export default ComixesPage;