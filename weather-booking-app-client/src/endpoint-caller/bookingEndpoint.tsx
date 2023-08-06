import ApiService from "./apiService";
import { BookingResponse } from "./interfaces/bookings/BookingResponse";
import { WeatherOption } from "./interfaces/bookings/WeatherOption";
import { Location } from "./interfaces/locations/Location";

export default class BookingEndpoint {
  locations: Location[];

  constructor(locationData: Location[]) {
    this.locations = locationData;
  }

  static async create(): Promise<BookingEndpoint> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);

    return new BookingEndpoint(locationData);
  }

  static async getBookingList(userId: string): Promise<BookingResponse[]> {
    const bookingList = await ApiService.get(`/bookings/user/${userId}`).then((response) => response.data);
    return bookingList;
  }

  static async getLocation(): Promise<Location[]> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);
    return locationData;
  }

  createBooking = (location: number, date: string, timePeriod: string, weatherOption: WeatherOption) => {
    const userId = "7b9d4e65-d545-46f2-9572-19dad9206422";
    const body = {
      location: location,
      date: date,
      time_period: timePeriod,
      weather_option: weatherOption,
    };
    console.log(body);
    ApiService.post(`/bookings/user/${userId}`, body).then((response) => console.log(response.data));
  };

  static getCurrentDate(): string {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero based, so we add 1
    var dd = String(today.getDate()).padStart(2, "0"); // padStart adds leading zeros if needed

    var formattedDate = yyyy + "-" + mm + "-" + dd;
    return formattedDate;
  }

  getLocationSuburbs(): string[] {
    return this.locations.map((location) => location.suburb);
  }

  getLocation(): { suburb: string; state: string; postcode: string; country: string }[] {
    return this.locations;
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}
