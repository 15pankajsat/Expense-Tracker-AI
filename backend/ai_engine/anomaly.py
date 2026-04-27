def detect_anomaly(expenses, new_amount):
    if not expenses:
        return False

    avg = sum([e.amount for e in expenses]) / len(expenses)

    if new_amount > avg * 2:
        return True

    return False