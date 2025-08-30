import React, { useState } from 'react';
import { Star, Search, Grid, List, User, Calendar, ThumbsUp, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const NurseryReviewsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    // Sample customer reviews data
    const reviews = [
        {
            id: 1,
            name: "Priya Sharma",
            photo: null,
            rating: 5,
            feedback: "Amazing quality plants! The roses I bought are blooming beautifully in my garden. The staff was very helpful and provided great care instructions.",
            date: "2024-12-15",
            verified: true,
            helpfulCount: 12,
            plantsPurchased: ["Red Roses", "Jasmine Plant"]
        },
        {
            id: 2,
            name: "Rahul Patel",
            photo: null,
            rating: 5,
            feedback: "Excellent service and healthy plants. The mango sapling I purchased is growing well. Highly recommended nursery in Pune!",
            date: "2024-12-10",
            verified: true,
            helpfulCount: 8,
            plantsPurchased: ["Mango Sapling"]
        },
        {
            id: 3,
            name: "Anjali Desai",
            photo: null,
            rating: 4,
            feedback: "Good variety of tools and plants. The pruning shears work perfectly for my garden maintenance. Will definitely come back for more supplies.",
            date: "2024-12-08",
            verified: true,
            helpfulCount: 15,
            plantsPurchased: ["Pruning Shears", "Fertilizer"]
        },
        {
            id: 4,
            name: "Vikram Singh",
            photo: null,
            rating: 5,
            feedback: "Outstanding nursery! The owner's knowledge about plants is impressive. Got some rare flowering plants that are thriving in my balcony garden.",
            date: "2024-12-05",
            verified: true,
            helpfulCount: 20,
            plantsPurchased: ["Orchid Plants", "Peace Lily"]
        },
        {
            id: 5,
            name: "Meera Joshi",
            photo: null,
            rating: 4,
            feedback: "Great collection of indoor plants. The money plant and snake plant I bought are perfect for my home. Reasonable prices too!",
            date: "2024-12-03",
            verified: true,
            helpfulCount: 6,
            plantsPurchased: ["Money Plant", "Snake Plant"]
        },
        {
            id: 6,
            name: "Arjun Kumar",
            photo: null,
            rating: 5,
            feedback: "Fantastic experience! The organic pesticides recommended by the staff worked wonderfully. My vegetable garden is now pest-free and healthy.",
            date: "2024-12-01",
            verified: true,
            helpfulCount: 11,
            plantsPurchased: ["Neem Oil", "Fungicide"]
        },
        {
            id: 7,
            name: "Sunita Rao",
            photo: null,
            rating: 5,
            feedback: "Wonderful customer service and beautiful plants. The jasmine plant I purchased has filled my garden with amazing fragrance. Thank you!",
            date: "2024-11-28",
            verified: true,
            helpfulCount: 9,
            plantsPurchased: ["Jasmine Plant", "Rose Plant"]
        },
        {
            id: 8,
            name: "Deepak Mehta",
            photo: null,
            rating: 4,
            feedback: "Good quality gardening tools. The watering can and hand cultivator set are working great for my terrace garden. Value for money!",
            date: "2024-11-25",
            verified: true,
            helpfulCount: 7,
            plantsPurchased: ["Watering Can", "Cultivator Set"]
        }
    ];

    const filteredReviews = reviews.filter(review => {
        const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.plantsPurchased.some(plant => plant.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    const getAverageRating = () => {
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            distribution[review.rating]++;
        });
        return distribution;
    };

    const ReviewCard = ({ review }) => (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-60"></div>

            {/* Header Section */}
            <div className="flex items-start justify-between mb-6 relative z-10">
                {/* Customer Avatar */}
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex items-center justify-center">
                        {review.photo ? (
                            <img
                                src={review.photo}
                                alt={review.name}
                                className="w-full h-full object-cover rounded-full border-3 border-emerald-100 shadow-md"
                            />
                        ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                                <User className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {review.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500 ml-2">
                                {review.rating}/5
                            </span>
                        </div>
                    </div>
                </div>

                {/* Verified Badge */}
                {review.verified && (
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center space-x-2 animate-pulse">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Verified</span>
                    </div>
                )}
            </div>

            {/* Review Content */}
            <div className="mb-6">
                <blockquote className="text-gray-700 text-base leading-relaxed italic bg-gradient-to-r from-gray-50 to-emerald-50 p-6 rounded-xl border-l-4 border-emerald-400 relative">
                    <span className="text-emerald-400 text-4xl absolute top-2 left-4 leading-none">"</span>
                    <p className="ml-6">{review.feedback}</p>
                    <span className="text-emerald-400 text-4xl absolute bottom-0 right-4 leading-none">"</span>
                </blockquote>
            </div>

            {/* Footer Info */}
            <div className="space-y-3 text-sm">
                {/* Purchase Info */}
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                    <p className="text-emerald-700 font-medium mb-1">
                        🌱 Purchased Plants:
                    </p>
                    <p className="text-emerald-600">
                        {review.plantsPurchased.join(', ')}
                    </p>
                </div>

                {/* Date and Helpful Count */}
                <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                        <ThumbsUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-gray-600">
                            {review.helpfulCount} helpful
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
    const ratingDistribution = getRatingDistribution();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Rating Overview */}
                <div className="mb-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Average Rating */}
                        <div className="text-center">
                            <div className="text-5xl font-bold text-green-600 mb-2">{getAverageRating()}</div>
                            <div className="flex justify-center mb-2">
                                {renderStars(Math.round(getAverageRating()))}
                            </div>
                            <p className="text-gray-600">Based on {reviews.length} reviews</p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="lg:col-span-2">
                            <h4 className="font-semibold text-gray-800 mb-4">Rating Breakdown</h4>
                            {[5, 4, 3, 2, 1].map(rating => (
                                <div key={rating} className="flex items-center mb-2">
                                    <span className="w-8 text-sm text-gray-600">{rating}</span>
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2" />
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${(ratingDistribution[rating] / reviews.length) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-8">{ratingDistribution[rating]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search and View Controls */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Customer Testimonials
                    </h2>
                    <p className="text-gray-600">
                        Showing {filteredReviews.length} of {reviews.length} reviews
                        {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                </div>

                {/* Reviews Grid/List */}
                {filteredReviews.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-6"
                    }>
                        {filteredReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews found</h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? `No reviews match your search "${searchTerm}"`
                                : "No reviews available at the moment"
                            }
                        </p>
                    </div>
                )}

                {/* Review Statistics */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">
                            📊 Customer Satisfaction Stats
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                            <h4 className="font-semibold text-gray-800 mb-2">Satisfaction Rate</h4>
                            <p className="text-gray-600 text-sm">Customers love our service</p>
                        </div>

                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                            <h4 className="font-semibold text-gray-800 mb-2">Happy Customers</h4>
                            <p className="text-gray-600 text-sm">Growing community of garden lovers</p>
                        </div>

                        <div className="text-center p-6 bg-amber-50 rounded-xl">
                            <div className="text-3xl font-bold text-amber-600 mb-2">{getAverageRating()}</div>
                            <h4 className="font-semibold text-gray-800 mb-2">Average Rating</h4>
                            <p className="text-gray-600 text-sm">Consistently high quality</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            🌟 Share Your Experience
                        </h3>
                        <p className="text-lg text-green-100 mb-6">
                            We'd love to hear about your garden journey with our plants and tools!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/contact" className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg">
                                Visit Our Store
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NurseryReviewsPage;