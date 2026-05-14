from datetime import datetime, timezone


def main():
    timestamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    print(f"[reporter] Report generated at {timestamp}")


if __name__ == "__main__":
    main()
