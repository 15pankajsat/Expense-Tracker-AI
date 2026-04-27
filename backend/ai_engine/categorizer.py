def categorize(text):
    text = text.lower()

    if "swiggy" in text or "zomato" in text:
        return "Food"
    elif "uber" in text or "ola" in text:
        return "Transport"
    elif "amazon" in text:
        return "Shopping"
    else:
        return "Other"