var Utils = {
    intTo4Chars: function (i) {
        if (typeof i !== "number") return "0000";
        if (i > 9999 || i <= 0) return "0000";
        if (i >= 1000) return "" + i;
        else if (i >= 100) return "0" + i;
        else if (i >= 10) return "00" + i;
        else return "000" + i;
    }
};