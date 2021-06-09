const logout = async () => {
    const response = await fetch("/logout", {
        method: "get",
        headers: { "Content-Type": "application/json" },
    });
};
document.querySelector("#logout").addEventListener("click", logout);
