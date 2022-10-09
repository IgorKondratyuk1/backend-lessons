let addresses = [
    {
        id: 1,
        value: "Vasilkivska 10"
    },
    {
        id: 2,
        value: "Metrologichna 22"
    },
];

export const addressesDbRepository = {
    findAddresses() {
        return addresses;
    },
    deleteAddress(id: number) {
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id === id) {
                addresses.splice(i, 1);
                return true;
            }
        }

        return false;
    }
}