import "./BookingDetails.css";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg,
} from "@ionic/react";

import { closeOutline, arrowForwardOutline } from "ionicons/icons";
import sunImage from "../../assets/Icons/slight_touch_happyday.png";
import rainImage from "../../assets/Icons/rainy.png";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import Background from '../../components/ScreenComponents/Background';
import BookingPageState from "../../pages/BookingPage/Interface/BookingPageState";

type ConfirmWeatherData = BookingPageState;

interface IWeatherCardList {
    [category: string]: any;
    closeBookingDetail: (booking: any) => void;
    data: ConfirmWeatherData;
}


const confirmBookingDetails: React.FC<IWeatherCardList> = (props) => {
    return (
        <Background>
            <div className="booking-details-toolbar">
                <IonButton
                    onClick={() => props.closeBookingDetail(null)}
                    className="booking-details-back-button invisible-button"
                >
                    <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
                </IonButton>
            </div>

            <h1 className="booking-details-title">Booking Details</h1>
            <IonCard className="booking-details-card">
                <IonCardContent>
                    <div className="booking-details-content">
                        <div className="booking-details-details">
                            <IonCardTitle className="booking-details-details__title">
                                {props.data.location}
                            </IonCardTitle>
                            <IonCardSubtitle className="booking-details-details__subtitle">
                                {props.data.date}
                            </IonCardSubtitle>
                            <p className="booking-details-details__weather">
                            </p>
                        </div>
                        <div className="booking-details-img-container">
                            <IonImg className="booking-details-img" src={
                                props.data.weatherOptions[props.data.selectedWeatherOption].image
                            } />
                        </div>
                    </div>

                    {/* Cards */}
                    <IonCard className="enjoy-weather-card">
                        <div className="enjoy-weather-content">
                            Enjoy your weather!
                        </div>
                    </IonCard>

                    <IonCard className="share-card">
                        <div className="share-card__title">
                            Share your booking with friends
                        </div>
                        <IonButton className="share-button" href="https://ko-fi.com/">
                            Share Now
                            <IonIcon icon={arrowForwardOutline}></IonIcon>
                        </IonButton>
                    </IonCard>

                </IonCardContent>
            </IonCard>
            <div
                className="button-container"
                style={{
                    marginBottom: 'vh',
                    marginTop: '10vh',
                    width: "100vw"
                }}>

                <div className="book-button"
                    style={{
                        width: "50vw"
                    }}
                    onTouchEnd={props.book}
                >
                    Confirm
                </div>
            </div>
        </Background>
    );
};

export default confirmBookingDetails;
