export const decomposeInterval = (dateInit, dateEnd) => {
    let interval = dateEnd - dateInit;

    let day = Math.floor(interval / (24 * 60 * 60 * 1000))
    let exact_day = day * (24 * 60 * 60 * 1000)

    interval -= exact_day

    let hour = Math.floor(interval / (60 * 60 * 1000))
    let exact_hour = hour * (60 * 60 * 1000)

    interval -= exact_hour

    let minute = Math.floor(interval / (60 * 1000))
    let exact_minute = minute * (60 * 1000)

    interval -= exact_minute

    let second = Math.floor(interval / 1000)

    return [day, hour, minute, second]
}