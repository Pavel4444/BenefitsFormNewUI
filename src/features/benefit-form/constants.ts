export const currencyFormatter = new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
});

export const appTheme = {
    primaryColor: "blue",
    fontFamily: "Open Sans, ui-sans-serif, system-ui, sans-serif",
    headings: {
        fontFamily: "Barlow Condensed, Open Sans, ui-sans-serif, sans-serif",
    },
};

export const today = new Date();
