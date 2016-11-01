export default class Logic {
    constructor() {
        this.products = [];
        this.getProducts();
    }
    getProducts() {
        var self = this;
        return fetch('https://snapmate-e09f3.firebaseio.com/products.json?print=pretty')
            .then((response) => response.json())
            .then((responseJson) => {
                self.products = self.parseResponse(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    parseResponse(res) {
        var arr = [];
        for (var r in res) {
            arr.push(res[r]);
        }
        return arr;
    }
    takeCode(e) {
        var self = this;
        if (self.state.barcodeRunning === false) {
            self.setState({ barcodeRunning: true });
            self.setState({ finderColor: { borderColor: "#00BCD4" } });
            var x = self.logic.findCode(e.data);
            setTimeout(function () { self.logic.barcodeMessage(self, x, e); }, 250)
        }
    }
    barcodeMessage(self, x, e) {
        self.setState({ showMessage: true });
        if (x.success == true) {
            self.setState({ message: x.name + "\n #" + e.data });
        } else {
            self.setState({ messageColor: { backgroundColor: "#004d56" } });
            self.setState({ message: "Product is not currently in stock." });
        }
    }
    findCode(code) {
        res = { success: false, name: "" }
        for (var i = 0; i < this.products.length; i++) {
            if (+this.products[i].upc === +code) {
                res.success = true;
                res.name = this.products[i].product_name;
            }
        }
        return res;
    }
    closeModal() {
        this.setState({ showMessage: false });
        this.setState({ barcodeRunning: false });
        this.setState({ finderColor: { borderColor: "whitesmoke" } });
        this.setState({ messageColor: { backgroundColor: "#00BCD4" } });
    }
    takePicture() {
        //this.camera.capture()
          //  .then((data) => console.log(data))
           // .catch(err => console.error(err));
    }
}