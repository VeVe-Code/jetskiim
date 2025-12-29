const { request } = require('express');
let stripe = require('stripe');
const booking = require('../model/booking');


let stripeWebhooks = async (req, res) => {
    let stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    let sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
    // Handle the event
    if(event.type === 'payment_intent.succeeded'){
        const paymentIntent = event.data.object;
        let paymentIntentId = paymentIntent.id;

        let session = await stripeInstance.checout.sessions.list({
            payment_intent: paymentIntentId,
        })

        let {bookingId} = session.data[0].metadata;
        await booking.findByIdAndUpdate(bookingId, {isPaid: true});
        console.log('PaymentIntent was successful!');
        res.json({received: true});
    }
}

module.exports = stripeWebhooks;