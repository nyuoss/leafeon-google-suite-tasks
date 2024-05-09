const useGoogleDocs = require("../GoogleDocsContext");
const GoogleDocsContext = require("../GoogleDocsContext")

test("useGoogleDocs non-empty", () => {
    expect(useGoogleDocs).not.toBeNull()
});


test("GoogleDocsContext created", () => {
    expect(GoogleDocsContext).not.toBeNull()
});