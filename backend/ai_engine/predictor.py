def predict(expenses):
    if not expenses:
        return 0

    total = sum([e.amount for e in expenses])
    return total / len(expenses)