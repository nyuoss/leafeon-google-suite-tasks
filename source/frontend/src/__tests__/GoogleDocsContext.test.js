const useGoogleDocs = require("../GoogleDocsContext");

test("useGoogleDocs non-empty", () => {
    expect(useGoogleDocs).not.toBeNull()
});
