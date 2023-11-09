import requests from "./httpServices3";

const ProvincesServices = {
    getCity: async () => {
        return requests.get("/?depth=1");
    },
    getDistricts: async (selectedCity) => {
        console.log('selectedCity', selectedCity)
        return requests.get(`/p/${selectedCity}?depth=2`);
    },
    getWards: async (selectedDistrict) => {
        return requests.get(`/d/${selectedDistrict}?depth=2`);
    },

};

export default ProvincesServices;
